import 'dotenv/config'
const {
     REACT_APP_CHECH_PUBLIC_API_KEY
} = process.env;
const configData = {
     chec_public_api: REACT_APP_CHECH_PUBLIC_API_KEY
}
export default configData;