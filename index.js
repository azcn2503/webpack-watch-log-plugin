var os = require("os");

var clockEmoji = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"];

var getClockEmoji = function(n) {
  n = n || 0;
  return clockEmoji[n % clockEmoji.length];
}

var DEFAULT_HEARTBEAT = function(count, compileTime) {
  return "Waiting for changes... " + count;
};

function WebpackWatchLogPlugin(options) {
  options = options || {};
  options.heartbeat = options.heartbeat || DEFAULT_HEARTBEAT;
  return function() {
    var self = this;
    this.watching = false;
    this.timer = null;
    this.count = 0;
    this.plugin("watch-run", function(watching, callback) {
      self.watching = true;
      if (self.timer && options.heartbeat) {
        clearInterval(self.timer);
        self.count = 0;
      }
      newLine("✨  Begin compile at " + new Date());
      callback();
    });
    this.plugin("after-emit", function(compilation, callback) {
      // Delay to allow webpack to print its own stats first
      setTimeout(function() {
        var compileTime = new Date();
        if (compilation.errors.length > 0) {
          newLine("❌  Finished compile (with " + pluralise(compilation.errors.length, "error") + ") at " + compileTime);
        } else if (compilation.warnings.length > 0) {
          newLine("⚠️  Finished compile (with " + pluralise(compilation.warnings.length, "warning") + ") at " + compileTime);
        } else {
          newLine("✅  Finished compile at " + compileTime);
        }
        if (self.watching && options.heartbeat) {
          self.timer = setInterval(function() {
            sameLine(getClockEmoji(self.count) + "  " + options.heartbeat(self.count, compileTime));
            self.count += 1;
          }, 1000);
        }
      });
      callback();
    });
  };
}

function sameLine(message) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(message);
}

function newLine(message) {
  console.log(os.EOL + message);
}

function pluralise(n, noun) {
  return n + " " + (n > 1 ? noun + "s" : noun);
}

module.exports = WebpackWatchLogPlugin;
