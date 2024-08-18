export const config = {
  orderApi: {
    dev: {
      url: 'devOrderUrl',
      jwt: process.env.ORDER_API_JWT_DEV || ''
    },
    test: {
      url: 'testorderUrl',
      jwt: process.env.ORDER_API_JWT_TEST || ''
    },
    qual: {
      url: 'qualOrderUrl',
      jwt: process.env.ORDER_API_JWT_QUAL || ''
    }
  },
  TestConfigIntentApi: {
    dev: {
      url: 'devIntUrl',
      jwt: process.env.PAYMENT_INTENT_JWT_DEV || ''
    },
    test: {
      url: 'testIntUrl',
      jwt: process.env.PAYMENT_INTENT_JWT_TEST || ''
    },
    qual: {
      url: 'qualIntUrl',
      jwt: process.env.PAYMENT_INTENT_JWT_QUAL || ''
    }
  },
  proxy: {
    local: '',
    dev: '',
    test: '',
    qual: '',
    prodbypass: ''
  },
  ui: {
    local: '',
    dev: '',
    test: '',
    qual: '',
    prodbypass: ''
  }
};
