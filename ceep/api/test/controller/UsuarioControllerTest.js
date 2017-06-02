const app = require('../../config/expressApp');
const request = require('supertest')(app);

describe('Estou testando o controller', () => {
    it('Verificar se o formulário está aparecendo', () => {
        request.get('/usuario234234')
               .expect(200)
               .expect('Content-Type', 'html')
               .end(function(err, res) {
                      if (err) throw err;
                    });
    });
});
