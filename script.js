window.addEventListener('DOMContentLoaded', function () {
    const themeButton = document.querySelector('.header__theme');
    const themeText = document.querySelector('.header__theme');

    if (localStorage.getItem("isDark") === "true") {
        document.body.classList.toggle("dark-theme");
        themeText.textContent = "light";
    } else {
        document.body.classList.toggle("dark-theme");
        themeText.textContent = "dark";
    }

    function changeTheme() {
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("isDark", "false");
            document.body.classList.toggle("dark-theme");
            themeText.textContent = "dark";
        } else {
            localStorage.setItem("isDark", "true");
            document.body.classList.toggle("dark-theme");
            themeText.textContent = "light";
        }
    }

    themeButton.addEventListener('click', () => {
        changeTheme();
    })

    if (localStorage.getItem("isDark") === "true") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.value = "";
    }

    function setError(text) {
        const newMessage = document.createElement('div');
        newMessage.textContent = text;
        newMessage.classList.add('form-message');
        document.querySelector('.search__button').before(newMessage);
    }

    function getData() {
        const GitHubUsername = document.getElementById('form-input').value;
        const formMessage = document.querySelector('.form-message');

        if (formMessage) {
            formMessage.remove();
        }

        fetch(`https://api.github.com/users/${GitHubUsername}`)
            .catch((e) => {
                console.error(e);
                setError("Server error");
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Not Found") {
                    setError("No results");
                } else {
                    const emptyField = "Empty field";

                    //name
                    const nameElement = document.querySelector('.top__title');

                    if (nameElement) {
                        if (data.name) {
                            nameElement.textContent = data.name;
                        } else {
                            nameElement.textContent = emptyField;
                        }
                    } else {
                        console.error(`No element: ${nameElement}`);
                    }

                    //login
                    const loginElement = document.querySelector('.top__nickname');

                    if (loginElement) {
                        if (data.login) {
                            loginElement.textContent = `@${data.login}`;
                        } else {
                            loginElement.textContent = emptyField;
                        }
                    } else {
                        console.error(`No element: ${loginElement}`);
                    }

                    //bio
                    const bioElement = document.querySelector('.top__bio');

                    if (bioElement) {
                        if (data.bio) {
                            bioElement.textContent = data.bio;
                        } else {
                            bioElement.textContent = "This profile has no bio";
                        }
                    } else {
                        console.error(`No element: ${bioElement}`);
                    }

                    //joined
                    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const joinElement = document.querySelector('.top__joined');

                    if (joinElement) {
                        if (data.created_at) {
                            const joinDate = new Date(data.created_at);
                            joinElement.innerHTML = `Joined ${joinDate.getDate()} ${month[joinDate.getMonth()]} ${joinDate.getFullYear()}`;
                        } else {
                            joinElement.textContent = emptyField;
                        }
                    } else {
                        console.error(`No element: ${joinElement}`);
                    }

                    //repos
                    const reposElement = document.querySelector('.values__item--repos');

                    if (reposElement) {
                        reposElement.textContent = data.public_repos;
                    } else {
                        console.error(`No element: ${reposElement}`);
                    }

                    //followers
                    const followersElement = document.querySelector('.values__item--followers');

                    if (followersElement) {
                        followersElement.textContent = data.followers;
                    } else {
                        console.error(`No element: ${followersElement}`);
                    }

                    //following
                    const followingElement = document.querySelector('.values__item--following');

                    if (followingElement) {
                        followingElement.textContent = data.following;
                    } else {
                        console.error(`No element: ${followingElement}`);
                    }

                    //profile image
                    const avatarElement = document.getElementById('profile-img');

                    if (avatarElement) {
                        avatarElement.src = data.avatar_url;
                    } else {
                        console.error(`No element: ${avatarElement}`);
                    }

                    //location
                    const locationElement = document.querySelector('.add-info__location .add-info__text');

                    if (locationElement) {
                        if (data.location) {
                            locationElement.textContent = data.location;
                        } else {
                            locationElement.textContent = emptyField;
                        }
                    } else {
                        console.error(`No element: ${locationElement}`);
                    }

                    //twitter
                    const twitterElement = document.querySelector('.add-info__twitter .add-info__text');

                    if (twitterElement) {
                        if (data.twitter_username) {
                            twitterElement.textContent = data.twitter_username;
                        } else {
                            twitterElement.textContent = emptyField;
                        }
                    } else {
                        console.error(`No element: ${twitterElement}`);
                    }

                    //blog
                    const blogElement = document.getElementById('blog');

                    if (blogElement) {
                        blogElement.style.pointerEvents = "auto";
                        if (data.blog) {
                            blogElement.textContent = data.blog;
                            blogElement.href = data.blog;
                        } else {
                            blogElement.textContent = emptyField;
                            blogElement.style.pointerEvents = "none";
                        }
                    } else {
                        console.error(`No element: ${blogElement}`);
                    }

                    //company
                    const companyElement = document.querySelector('.add-info__company .add-info__text');

                    if (companyElement) {
                        if (data.company) {
                            companyElement.textContent = data.company;
                        } else {
                            companyElement.textContent = emptyField;
                        }
                    } else {
                        console.error(`No element: ${companyElement}`);
                    }

                }

            })
    }

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        getData();
    });
});

