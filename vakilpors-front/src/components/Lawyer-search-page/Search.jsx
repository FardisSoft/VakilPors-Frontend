import '../css/Search.css';




const Search = ({ LawyerSearch, LawyerQuery }) => {

    return (
        <>

            <div class="landing-layer home-page my-5">
                <div class="landing-content">
                    <div class="landing-header cooperation animated fadeIn">
                        <h2>
                            جست و جوی بهترین وکیل ، بررسی پرونده ، پیروزی در دادگاه !
                        </h2>
                        <span>
                         با بهترینــــ هزینه ، بهترینــــ وکلا را انتخا بــــ کن
                        </span>
                    </div>
                    <div class="container">
                        <div class="landing-content">
                            <div class="landing-search">
                                <form >
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
            </div>
        </>

    );
};

export default Search;
