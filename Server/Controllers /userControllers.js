
export const signup=((req,res)=>{
    const {name,email,number,password,cpassword,image}=req.body;
    console.log(name,email,number,password,cpassword,image);
    try {
        res.json('signup completed')
    } catch (error) {
        res.status(500).json(error)
    }
})
export const login=((req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try {
        res.json('login completed')
    } catch (error) {
        res.status(500).json(error)
    }
})
export const home=((req,res)=>{
    try {
        res.json('welcome home')
    } catch (error) {
        res.status(500).json(error)
    }
})