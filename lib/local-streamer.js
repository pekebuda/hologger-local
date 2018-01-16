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
    this._logLevels = ["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"];
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




////// INHERITS FROM STREAMER 
LocalStreamer.prototype = Object.create(Streamer.prototype);
LocalStreamer.prototype.constructor = LocalStreamer;




/**
 * @description
 * Sobreescribe el metodo homonimo de la clase {Streamer}.
 * 
 * Puesto que en entornos de desarrollo (development) solo se loguea un 
 * mensaje que resume el evento (al contrario que en pre-produccion y en 
 * produccion, donde se almacena como JSON toda la informacion del mismo),
 * en los casos en que el evento contenga un Object de tipo Error, ademas 
 * del slug se loguea explicitamente el stack del Error, pues de otro modo se 
 * pierde la informacion contenida en el mismo, vital para la depuracion 
 * del mismo.
 * 
 * 
 * @param {Function} outlet               Canal a traves del cual se producira el 
 * volcado de datos. Debe tratarse por ello de un metodo o {Function} encargado 
 * de la escritura de datos; es decir, que dada una informacion, produzca a su 
 * invocacion el registro en algun soporte. Vgr, el metodo `log` de la API 
 * `console` (`console.log`). Required.
 * @param {Mixed} info  
 */
LocalStreamer.prototype._log = function(outlet, info){
    if (this._logLevels && this._logLevels.indexOf(info.severity) < this._minLogLevel) return;
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