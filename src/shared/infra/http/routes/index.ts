import { Router } from 'express'
import { authenticateRoutes } from './authenticate-routes'
import { usersRoutes } from './users-routes'
import { passwordsRoutes } from './passwords-routes'

const router = Router()

router.use(authenticateRoutes)
router.use('/users', usersRoutes)
router.use('/passwords', passwordsRoutes)

export { router }
