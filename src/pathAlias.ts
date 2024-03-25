import ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@components': `${__dirname}/components`,
  '@constants': `${__dirname}/constants`,
  '@exceptions': `${__dirname}/exceptions`,
  '@interfaces': `${__dirname}/interfaces`,
  '@plugins': `${__dirname}/plugins`,
  '@types': `${__dirname}/types`,
  '@utils': `${__dirname}/utils`,
});
