import '../css/Search.css';




const Search = ({LawyerSearch,LawyerQuery}) => {

    return (
        <div class="landing-layer home-page">
            <div class="container">
                <div class="landing-content">
                    <div class="landing-search">
                        <form method="get" action="/courses">
                            <input
                                dir="rtl"
                                type="text"
                                value={LawyerQuery.text}
                                onChange={LawyerSearch}
                                className="form-control"
                                placeholder="وکیلتو پیدا کن!"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
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
