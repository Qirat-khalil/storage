
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

    // console.log(user_profilePic.files[0]);
    // console.log(user_email.value);
    // console.log(user_pass.value);

    const { data: { user: { id: userId } } } = await merg.auth.getUser()
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
                    .upload(`avater/user${userId}.${fileExt}`, user_profilePic.files[0], {
                        upsert: true
                    })
                if (error) {
                    // Handle error
                    console.log(error);

                } else {
                    // Handle success
                    console.log("data", data);

                    // get profile url

                    const { data:{publicUrl} } = merg
                        .storage
                        .from('users')
                        .getPublicUrl(`avater/user${userId}.${fileExt}`)
                        console.log(publicUrl);
                        

                    // table info 

                    const { error } = await merg
                        .from('profile-pic')
                        .insert({ user_id: userId, full_name: full_name, profile_pic: user_profilePic })
                }
                //   window.location.href ="profile.html" 
            }

            if (error.message.includes("Unable to validate email address: invalid format")) {
                alert("Incorrect Email Format")
            } else if (error.message.includes('Invalid login credentials')) {
                alert('Incorrect credentials');

            } else {
                alert("Sign up successful! Check your email for verification link.");

            }
        } catch {
            console.log(error.message);
            alert("Something went wrong: " + error.message);
        }

    } else {
        alert("please fill the field")
    }

})

// / fetching profile pic and other details

// const showDetails = async (profilepic, email, full_name) => {
// 	const {
// 		data: {
// 			user: { id: userId, email: userEmail },
// 		},
// 		error,
// 	} = await client.auth.getUser();
// 	if (email) {
// 		email.value = userEmail;
// 	}
// 	if (userId) {
// 		const {
// 			data: [{ full_name: dbName, profilepic: publicUrl }],
// 			error,
// 		} = await client.from('profiles').select().eq('user_id', userId);

// 		console.log(full_name, profilepic);
// 		if (publicUrl) {

// 			const avatar = document.getElementById('avatar');
// 			if (avatar) {

// 				avatar.src = publicUrl;
// 			}
// 			if (profilepic) {

// 				profilepic.src = publicUrl;
// 				full_name.value = dbName;
// 			}

// 		} else {
// 			console.log(error);
// 		}
// 	} else {
// 		console.log(error);
// 	}
// };

// if (window.location.pathname == '/post.html') {
// 	showDetails();
// }

// if (window.location.pathname == '/profile.html') {
// 	const profilepic = document.getElementById('profilepic');
// 	const email = document.getElementById('email');
// 	const full_name = document.getElementById('full_name');
// 	console.log(profilepic, email, full_name)
// 	showDetails(profilepic, email, full_name);
// }



// // change profile picture preview

// const saveBtn = document.getElementById("save-profile-picture")
// console.log(saveBtn);


// saveBtn && saveBtn.addEventListener("click", async () => {
// 	const newProfile = document.getElementById("profile-picture-input")

// 	const previewProfile = newProfile.files[0]

// 	const profileURl = URL.createObjectURL(previewProfile)

// 	const profilepic = document.getElementById("profilepic")
// 	profilepic.src = profileURl

// 	const finalsave = document.getElementById("finalsave")

// 	console.log(profilepic.src)

// 	const {
// 		data: { user },
// 	} = await client.auth.getUser();
// 	console.log(user);

// 	const response = await fetch(profilepic.src.split('.').pop());

// 	const fileEx = previewProfile.name.split('.')[1];
// 	// // here image is url/location of image
// 	const blob = await response.blob();
// 	const file = new File([blob], `user-${user.id}.${fileEx}`);
// 	console.log(file);


// 	finalsave.addEventListener("click", async () => {

// 		console.log(`avatars/user-${user.id}.${fileEx}`);

// 		const { data, error } = await client
// 			.storage
// 			.from('users')
// 			.upload(`avatars/user-${user.id}.${fileEx}`, file, {
// 				cacheControl: '3600',
// 				upsert: true
// 			})

// 		console.log(data)
// 		console.log(error);

// 	})


// })

// profile fetch\

