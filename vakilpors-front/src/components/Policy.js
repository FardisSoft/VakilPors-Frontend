import React from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography } from "@mui/material";

const Policy = () => {
  return (
    <>
      {/* <Helmet>
        <title>قوانین سایت</title>
      </Helmet> */}
      <Grid
        container
        sx={{
          padding: "50px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          width={{ xs: "95%", sm: "95%", md: "90%" }}
          direction={"column"}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
            padding: "30px",
          }}
        >
          <Grid>
            <Typography
              variant="h1"
              sx={{ fontSize: 20, fontFamily: "shabnam", color: "#63B3E9" }}
            >
              قوانین وکیل پرس
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: 17,
                fontFamily: "shabnam",
                marginTop: "20px",
                fontWeight: 600,
              }}
            >
              قوانین مربوط به وکلا
            </Typography>
          </Grid>
          <Typography
            variant="body1"
            sx={{
              marginTop: "20px",
              fontFamily: "shabnam",
              lineHeight: "2",
              textAlign: "justify",
            }}
          >
            ۱_ هرگاه از تقصیر وکیل خسارتی به موکل متوجه شود که عرفاً وکیل مسبب
            آن محسوب می‌گردد مسئول خواهد بود. <br />
            ۲– وکیل باید در تصرفات و اقدامات خود مصلحت موکل را مراعات نماید و از
            آن چه که موکل بالصراحه به او اختیار داده یا بر حسب قرائن و عرف و
            عادت داخل اختیار اوست، تجاوز نکند. <br />
            ۳– وکیل باید حساب مدت وکالت خود را به موکل بدهد و آن چه را که به جای
            او دریافت کرده است به او رد کند. <br />
            ۴– هر گاه برای انجام یک امر، دو یا چند نفر وکیل معین شده باشد هیچ یک
            از آن‌ها نمی‌تواند بدون دیگری یا دیگران دخالت در آن امر بنماید مگر
            این که هر یک مستقلاً وکالت داشته باشد، در این صورت هر کدام می‌تواند
            به تنهایی آن امر را به جا آورد. <br />
            ۵– در صورتی که دو نفر به نحو اجتماع ، وکیل باشند به موت یکی از آن‌ها
            وکالت دیگری باطل می‌شود. <br />
            ۶– وکالت در هر امر، مستلزم وکالت در لوازم و مقدمات آن نیز هست مگر
            این که تصریح به عدم وکالت باشد. <br />
            ۷– وکیل در امری نمی‌تواند برای آن امر به دیگری وکالت دهد مگر این که
            صریحاً یا به دلالت قرائن، وکیل در توکیل باشد. <br />
            ۸– اگر وکیل که وکالت در توکیل نداشته، انجام امری را که در آن وکالت
            دارد به شخص ثالثی واگذار کند هر یک از وکیل و شخص ثالث در مقابل موکل
            نسبت به خساراتی که مسبب محسوب می‌شود مسئول خواهد بود. <br />
            ۹- وکیل تحت هیچ شرایطی اجازه ندارد از سیطره ی اختیارات خود فراتر رود
            و خلاف نظر موکل خود مبادرت به انجام امری نماید. <br />
          </Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: 17,
                fontFamily: "shabnam",
                marginTop: "20px",
                fontWeight: 600,
              }}
            >
              قوانین مربوط به کاربران
            </Typography>
          </Grid>
          <Typography
            variant="body1"
            sx={{
              marginTop: "20px",
              fontFamily: "shabnam",
              lineHeight: "2",
              textAlign: "justify",
            }}
          >
            ۱- کاربر تعهد می‌دهد، تمامی اطلاعاتی که در این سایت وارد کرده است
            واقعی بوده و مسئولیت هر گونه استفاده از اسامی جعلی و پنهان کردن هویت
            اصلی متوجه کاربر می‌باشد. <br />
            ۲- کاربر تعهد می‌دهد که در صورت اسافاده از مطالب حتما حقوق تالیف
            کننده را رعایت نماید <br />
            ۳- موکل تمام مخارجی را که وکیل برای انجام وکالت پرداخت کرده است و
            همچنین اجرت وکیل را باید بدهد مگر اینکه در قرار داد وکالت طور دیگری
            توافق شده باشد . <br />
            ۴- موکل موظف است اجرت وکیل را پرداخت نماید مگر اینکه وکیل و موکل در
            قرارداد وکالت طور دیگری توافق کرده باشند در واقع حق الوکاله وکیل
            تابع قرارداد بین طرفین خواهد بود و اگر نسبت به حق الوکاله یا مقدار
            آن توافقی در قرارداد نکرده باشند بر طبق عرف حق الوکاله تعیین می گردد
            . <br />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Policy;
