import '../../css/Search.css';
import { FaEye, FaSearch } from 'react-icons/fa';
import MovingBar from '../premium-page/MovingBar';



const Search = ({ LawyerSearch, LawyerQuery }) => {
    const text =
        'استفاده از برنامه پریمیوم هفتگی به شما این امکان را می‌دهد که به طور مداوم با مشتریان جدید ارتباط برقرار کنید. با قیمت مقرون به صرفه و امکانات منحصر به فرد، کسب و کار شما در نتایج جستجو و بخش‌های پیشنهادی به چشم می‌خورد. این برنامه امکاناتی همچون قرار دادن لیست ویژه، نمایش تبلیغات در صفحات با ترافیک بالا، گزارش تحلیلی از کلیک‌ها و تاثیرات، و خلاقیت‌های سفارشی برای تبلیغات موثر را فراهم می‌کند.' +

        'هر روز با مشتریان محلی در تماس بودن نقش اساسی در رشد کسب و کار شما دارد. با برنامه روزانه، لیست کسب و کار شما به مدت 24 ساعت در سایت ما به صورت برجسته نمایش داده می‌شود، تا به حداکثر دیده شدن برسد. این فرصت را از دست ندهید و از تبلیغات روزانه برای جذب مشتریان جدید بهره مند شوید. این برنامه همچنین از امکاناتی همچون قرار دادن لیست ویژه، نمایش تبلیغات در صفحات با ترافیک بالا، گزارش تحلیلی از کلیک‌ها و تاثیرات، و خلاقیت‌های سفارشی برای تبلیغات موثر بهره می‌برد.';


    return (
        <>
                        {/* <MovingBar /> */}
            {/* <MovingBar style={}/> */}
            <div class="landing-layer home-page ">
            {/* <MovingBar /> */}
            {/* <MovingBar sx={{justifyContent: "center" }} style={{ width: "2000px"}} /> */}
                <div class="landing-content">
                

                    <div class="landing-header cooperation animated fadeIn" style={{ fontFamily: "shabnam" }}>

                        {/* <Box sx={{ flexGrow: 1, padding: "20px" }}> */}
                            {/* Add the MovingBar component at the bottom of the content */}
                        {/* </Box> */}
                        <h2>
                            جست و جوی بهترین وکیل ، بررسی پرونده ، پیروزی در مجامع قضایی!
                        </h2>
                        <span>
                            با بهترین هزینه ، بهترین وکلا رو مال پرونده ات کن!
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
                                        onClick={LawyerSearch}
                                        className="form-control"
                                        placeholder="وکیلتو پیدا کن!"
                                        aria-label="Search"
                                        style={{ fontFamily: "shabnam" }}
                                        aria-describedby="basic-addon1"
                                    />
                                    <button>
                                        <i class="zmdi zmdi-search" style={{ position: "relative", left: "-10px" }}><FaSearch /></i>
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
