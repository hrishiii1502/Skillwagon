import bcryptjs from "bcryptjs";

async function login() {
  const password = "Secret@123";
  const hashed = "$2a$10$r5GQctJqClerviHw0kzfAOCADtfyFxvNm8NNHdflcWLIRPc633kmG";
  const extractSalt = bcryptjs.getSalt(hashed);
  const newHash = await bcryptjs.hash(password, extractSalt);
  console.log(newHash);
}

login();
