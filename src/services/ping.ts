import responses from '../utils/responses';
import { default as controllers } from '../controllers';

const ping = async ({ res }: any) => responses.success({ res, message: controllers.pong() });

export default ping;
