import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.list) //Obtener el listado de usuarios
  .post(userCtrl.create);
  
  router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

  router.route('/api/users/follow')
  .put(authCtrl.requireSignin,
    userCtrl.addFollowing,
    userCtrl.addFollower)

    router.route('/api/users/unfollow')
  .put(authCtrl.requireSignin,
    userCtrl.removeFollowing,
    userCtrl.removeFollower)

router.route('/api/users/:userId')// Para editar, eliminar y actualizar
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userById);// A todas las rutas de usuarios con user_id, se encarga automaticamente de buscar esos usuarios por esa ruta.

export default router;
