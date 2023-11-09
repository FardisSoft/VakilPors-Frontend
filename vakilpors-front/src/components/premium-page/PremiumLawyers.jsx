import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button 
} from '@material-ui/core'; 
import '../../css/PremiumLawyers.css'

// Plan data
const plans = [
    {
        name: 'برنامه روزانه',
        price: '$10',
        period: 'در روز',
        description: 'هر روز با مشتریان محلی در تماس باشید. لیست کسب و کار شما و تبلیغات شما برای 24 ساعت در سایت ما به صورت برجسته نمایش داده می شود، تا حداکثر دیده شدن را تضمین کند. از فرصت های روزانه برای جذب مشتریان جدید از دست ندهید.'
    },
    {
        name: 'برنامه هفتگی',
        price: '$50',
        period: 'در هفته',
        description: 'تبلیغات خود را با برنامه پریمیوم هفتگی ما به سطح بالاتری ببرید. با یک قیمت پایین، کسب و کار شما طول هفته برجسته خواهد شد. تبلیغات و لیست شما در نتایج جستجو و بخش های پیشنهادی اولویت دارد. بیشتر مشتریان را در طول 7 روز جذب کنید و نتایج واقعی برای کسب و کار خود ببینید.'
    }
];

function PlanCard({ plan }) {
    return (
        <Card className="plan-card">
            <CardHeader title={plan.name} />

            <CardContent>
                <p>{plan.description}</p>

                <div className="price">
                    <span className="amount">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                </div>
            </CardContent>

            <CardActions>
                <Button>انتخاب برنامه</Button>
            </CardActions>

        </Card>
    );
}

export default function Plans() {

    return (
        <div className="container">
            <h1 className="title">رشد کسب و کار خود را با تبلیغات هدفمند آنلاین افزایش دهید</h1>
            <p className="subtitle">بین برنامه های روزانه یا هفتگی انتخاب کنید تا با مشتریان جدید ارتباط برقرار کنید.</p>

            <div className="plans">
                {plans.map(plan => (
                    <PlanCard key={plan.name} plan={plan} />
                ))}
            </div>

            <h2 className="title">ویژگی های مشترک</h2>
            <p className="subtitle">هر دو برنامه شامل:</p>
            <ul className="features">
                <li>قرار دادن لیست ویژه</li>
                <li>نمایش تبلیغات در صفحات با ترافیک بالا</li>
                <li>گزارش تحلیلی از کلیک ها و تاثیرات</li>
                <li>خلاقیت های سفارشی برای تبلیغات موثر</li>
            </ul>

            <h2 className="title">بازخورد</h2>
            <blockquote className="testimonial">"با برنامه هفتگی، ما شاهد افزایش زیادی در مشتریان جدید بودیم. دیده شدن واقعا موثر بود. من بسیار توصیه می کنم حداقل یک هفته را انجام دهید تا نتایج را ببینید." - Jane Doe, Ace Plumbing</blockquote>
        </div>
    );
}
