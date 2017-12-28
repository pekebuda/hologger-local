var Streamer = require("hologger-streamer");


/**
 * @description
 * LocalStreamer constructor
 *
 * 
 * @api public
 * @inherits Streamer
 */
function LocalStreamer(){
    Streamer.call(this);
    
    this.name = "LocalStreamer";
    this.description = "LocalStreamer constructor";
    this.logLevels = ["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"];
    this.minLogLevel = process.env.LOCAL_LOG_LEVEL || process.env.HOLOGGER_LOG_LEVEL || 0;
    
    this._debugDrain = console.log;
    this._infoDrain = console.log;
    this._noticeDrain = console.warn;
    this._warningDrain = console.warn;
    this._errorDrain = console.error;
    this._criticalDrain = console.error;
    this._alertDrain = console.error;
    this._emergencyDrain = console.error;
}




////// INHERITS FROM STREAMER 
LocalStreamer.prototype = Object.create(Streamer.prototype);
LocalStreamer.prototype.constructor = LocalStreamer;




/**
 * @description
 * Sobreescribe el metodo homonimo de la clase `Streamer`, permitiendo cribar los 
 * logs por un nivel minimo de serveridad.
 *
 * 
 * @param {} outlet
 * @param {Mixed} info
 */
LocalStreamer.prototype._log = function(outlet, info){
    if ( this.logLevels.indexOf(info.severity) < this.minLogLevel ) return;
    //else: 
    if (info && info.slug) outlet(info.slug);
    if (info && info.err) {
        outlet("====================ERR STACK BEGINS===================");
        outlet(info.err.stack);
        outlet("====================ERR STACK ENDS===================");
    }
};




////// MODULE EXPORTS 
module.exports = exports = LocalStreamer;