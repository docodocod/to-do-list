const db=require('../db');
const {pbkdf2}=require('../utils/Encrypt');
const passport=require('passport');


//로그인 메서드
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/login');
        });
    })(req, res, next);
};


//회원가입 메서드
exports.join=async (req,res,next)=>{
    const {email,password,nick,obj_school}=req.body
    const connection=await db.getConnection();
    try {
        const sql=`select * from todos where=${email}`;
        const exUser=await connection.query(sql);
        if (exUser) {
            console.log('이미 가입된 회원입니다.')
            res.status(400).send(
                <script>
                    alert("아이디가 이미 존재합니다.");
                </script>
            )
        }
    }catch(err) {
        console.log(err);
    }
    try{
        const hashedPassword=await pbkdf2(password);
        const sql = `insert into todos(email,password,nick,obj_school) values(${email},${hashedPassword},${nick},${obj_school})`;
        await connection.query(sql);
        res.status(200).send(
            <script>
                alert('회원가입이 완료되었습니다.');
            </script>
        )
    }catch(err){
        console.log(err);
    }
}