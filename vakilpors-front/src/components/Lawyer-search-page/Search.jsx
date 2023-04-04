import '../css/Search.css';



const Search = () => {
    return (
        <div class="landing-layer home-page">
            <div class="container">
                <div class="landing-content">
                    <div class="landing-search">
                        <form method="get" action="/courses">
                        <input type="text" name="Search" placeholder=" چی میخوای یاد بگیری ؟ " class="autocomplete" autocomplete="off" />
                        <button>
                            <i class="zmdi zmdi-search"></i>
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Search;
