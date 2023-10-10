import { EnvService } from "./env.service";

export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService() as any;

  // Read environment variables from browser window
  const browserWindow: any = window  || {};
  const browserWindowEnv = browserWindow["__env"] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] =  window["__env" as any][key as any ];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
