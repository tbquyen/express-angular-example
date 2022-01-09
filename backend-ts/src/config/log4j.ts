/**
 * Required External Modules
 */
import log4js from "log4js";

/**
 * Log4js Definition
 */
log4js.configure({
  appenders: {
    out: { type: "stdout" },
    system: {
      type: "file",
      filename: "logs/system.log",
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
    errors: {
      type: "file",
      filename: "logs/errors.log",
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
    access: {
      type: "file",
      filename: "logs/access.log",
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
    fileSystem: { type: "logLevelFilter", appender: "system", level: "all" },
    fileErros: { type: "logLevelFilter", appender: "errors", level: "error" },
  },
  categories: {
    default: { appenders: ["out", "fileSystem", "fileErros"], level: "all" },
    access: { appenders: ["out", "access"], level: "all" },
    mongoose: { appenders: ["out", "fileSystem"], level: "all" },
  },
});

export default log4js;
