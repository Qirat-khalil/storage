
const supabaseUrl = "https://xtjuukzhvksfolnjwvzr.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0anV1a3podmtzZm9sbmp3dnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzk5NTcsImV4cCI6MjA2NzAxNTk1N30.6CUBA7UDHtJ5md2ci1NKJ-40wGBp-oV803es5_pUCs4"


const { createClient } = supabase;
let merg = createClient(supabaseUrl, supabaseKey);
console.log(merg)
let signbtn = document.getElementById("signup")

signbtn && signbtn.addEventListener("click", async () => {

    const full_name = document.getElementById('full_name');
    const user_email = document.getElementById('email_address');
    const user_pass = document.getElementById('user_pass');
    const user_profilePic = document.getElementById('user_profilePic');

    console.log(user_profilePic.files[0]);
    console.log(user_email.value);
    console.log(user_pass.value);

const {data:{user:{id:userId}}} = await merg.auth.getUser()
let fileExt = user_profilePic.files[0].name.split(".")[1]
console.log(fileExt);


    if (user_email && user_pass) {
        try {
            const { data, error } = await merg.auth.signUp({
                email: user_email.value,
                password: user_pass.value,
                options: {
                    full_name: full_name.value,
                }
            })
            console.log(data);

            if (data) {
                
                    const { data, error } = await merg.storage
                    .from('users')
                    .upload(`avater/user${userId}.${fileExt}`, user_profilePic.files[0],{
                        upsert:true
                    })
                    if (error) {
                        // Handle error
                        console.log(error);
                        
                    } else {
                        // Handle success
                        console.log("data", data);
                        
                    
                }
            }
            // window.location.href ="post.html"
            if (error.message.includes("Unable to validate email address: invalid format")) {
                alert("Incorrect Email Format")
            } else if (error.message.includes('Invalid login credentials')) {
                alert('Incorrect credentials');

            } else {
                alert("Sign up successful! Check your email for verification link.");
                // window.location.href = "post.html"; // Uncomment if redirect needed
                // window.location.href = "login.html"
            }
        } catch {
            console.log(error?.message);
            alert("Something went wrong: " + error.message);
        }

    } else {
        alert("please fill the field")
    }

})