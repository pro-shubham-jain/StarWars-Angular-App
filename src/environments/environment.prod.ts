export const environment = {

  PRODUCTION: !!window['__env' as any]['PRODUCTION' as any]
    ? window['__env' as any]['PRODUCTION' as any]
    : true,
  ENVIRONMENT_TYPE: !!window['__env'  as any ]['ENVIRONMENT_TYPE'  as any]
    ? window['__env'  as any]['ENVIRONMENT_TYPE'  as any]
    : 'Production',
  API_URL: !!window['__env'  as any]['API_URL'  as any]
    ? window['__env'  as any]['API_URL'  as any]
    : 'https://yourgateway.com/',
  API_URL_MASK: !!window['__env'  as any]['API_URL_MASK'  as any]
    ? window['__env'  as any]['API_URL_MASK'  as any]
    : 'https://admin.com/',
};
