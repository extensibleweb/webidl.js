'use strict';

module.exports = PullStream;

var inherits = require("util").inherits;
var PassThrough = require('readable-stream/passthrough');
var over = require('over');

function PullStream(opts) {
  var self = this;
  this.opts = opts || {};
  PassThrough.call(this, opts);
  this.once('finish', function() {
    self._writesFinished = true;
    if (self._flushed) {
      process.nextTick(self._finish.bind(self));
    }
  });
  this.on('readable', function() {
    self._process();
  });
  this.on('drain', function() {
    self._process();
  });
}
inherits(PullStream, PassThrough);

PullStream.prototype.pull = over([
  [over.numberOptionalWithDefault(null), over.func, function (len, callback) {
    if (len === 0) {
      return callback(null, new Buffer(0));
    }

    var self = this;
    pullServiceRequest();

    function pullServiceRequest() {
      self._serviceRequests = null;
      if (self._flushed) {
        return callback(new Error('End of Stream'));
      }

      var data = self.read(len || undefined);
      if (data) {
        process.nextTick(callback.bind(null, null, data));
      } else {
        self._serviceRequests = pullServiceRequest;
      }
    }
  }]
]);

PullStream.prototype.pipe = over([
  [over.numberOptionalWithDefault(null), over.object, function (len, destStream) {
    if (!len) {
      return PassThrough.prototype.pipe.call(this, destStream);
    }

    if (len === 0) {
      return destStream.end();
    }

    var self = this;
    pipeServiceRequest();

    function pipeServiceRequest() {
      self._serviceRequests = null;
      var data = self.read(len);
      if (data) {
        destStream.write(data);
        destStream.end();
      } else {
        self._serviceRequests = pipeServiceRequest;
      }
    }

    return destStream;
  }]
]);

PullStream.prototype._process = function () {
  if (this._serviceRequests) {
    this._serviceRequests();
  }
};

PullStream.prototype._flush = function (outputFn, callback) {
  var self = this;
  if (this._readableState.length > 0) {
    return process.nextTick(self._flush.bind(self, outputFn, callback));
  }

  this._flushed = true;
  return process.nextTick(function() {
    if (self._writesFinished) {
      self._finish(callback);
    } else {
      callback();
    }
  });
};

PullStream.prototype._finish = function (callback) {
  callback = callback || function () {};
  if (this._serviceRequests) {
    this._serviceRequests();
  }
  process.nextTick(callback);
};