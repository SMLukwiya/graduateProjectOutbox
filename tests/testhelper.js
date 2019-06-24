const chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai');

import 'chai/register-assert';  // Using Assert style
import 'chai/register-expect';  // Using Expect style
import 'chai/register-should';

// export expect and sinon globally
global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);
