import { AuthService } from "../../services/auth.service.js";

export async function AuthController(req, res) {
  const { name, email, photoUrl } = req.body;

  const data = await AuthService({name, email, photoUrl});
  data.error
    ? res.status(500).json({error: true, detail: data.detail})
    : res.status(200).json({error: false, detail: data.detail});
};