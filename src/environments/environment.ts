// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://nguyens-macbook-pro.local/console/wp-json',
  woocommerce: {
    // readOnlyKeys: {
    //   consumer_key: 'ck_b4fb6b076d27b07ac34c8169061161f065237af4',
    //   consumer_secret: 'cs_fc7699a788d05dfedf14676aa7c8bc68e6bd993d'
    // },
    writableKeys: {
      consumer_key: 'ck_bec3e48c4e76120b5fe64e02b856ba314b7094a8',
      consumer_secret: 'cs_c34863696ec9a8e0697c6bb23d875de56a0b3eda'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
