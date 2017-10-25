var Streamer = require("hologger-streamer");


/**
 * @description
 * LocalStreamer constructor
 *
 * 
 * @api private
 * @inherits Streamer
 *
 * 
 * @param {Object} library: libreria de codigos empleada
 * @param {Nomber} isil: identificador numerico de la libreria de codigos empleada
 */
function LocalStreamer(library, isil){
    Streamer.call(this, library, isil);
    
    this._name = "LocalStreamer";
    this._description = "LocalStreamer constructor";
    this._minLogLevel = process.env.LOCAL_LOG_LEVEL || process.env.HOLOGGER_LOG_LEVEL || 0;
    
    this._debugDrain = console.log;
    this._infoDrain = console.log;
    this._noticeDrain = console.warn;
    this._warningDrain = console.warn;
    this._errorDrain = console.error;
    this._criticalDrain = console.error;
    this._alertDrain = console.error;
    this._emergencyDrain = console.error;
}




/////// INHERITS FROM STREAMER 
LocalStreamer.prototype = Object.create(Streamer.prototype);
LocalStreamer.prototype.constructor = Streamer;




/////// MODULE EXPORTS 
module.exports = exports = LocalStreamer;