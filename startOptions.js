const MSG_LACK_ARGS = "Please specify path to a directory with js files and url to be mapped";
const MSG_LACK_URL = "Please specify rule url to be matched";

module.exports = function () {
    return {
        get: function () {
            console.log("CLI args count = ", process.argv.length);

            var options = {};

            if (process.argv.length < 3) {
                console.log(MSG_LACK_ARGS);
                return options;
            }

            if (process.argv.length < 4) {
                console.log(MSG_LACK_URL);
                return options;
            }

            // start analyze
            //
        }
    };
}
