import responses from '../utils/responses';
import { default as pong } from '../controllers/pong';

const ping = async ({ res }: any) => responses.success({ res, message: pong() });

export default ping;
