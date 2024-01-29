import { convertDateToJalali, primeFaceDataTablePaginatorTemplate } from '../utils'


test('primeFaceDataTablePaginatorTemplate returns the correct template', () => {
    expect(primeFaceDataTablePaginatorTemplate).toBe(
    'LastPageLink NextPageLink PageLinks PrevPageLink FirstPageLink CurrentPageReport'
    )
});


// test('convertDateToJalali converts a date to Jalali format', () => {
//     // create a date object with a known value
//     const date = new Date('2023-01-01T00:00:00Z')
//     // convert the date to Jalali format with dateStyle and timeStyle options
//     const convertedDate = convertDateToJalali(date, 'full', 'long')
//     // expect the converted date to match the expected value
//     expect(convertedDate).toBe('۱۴۰۱ دی ۱۱، یکشنبه ساعت ۳:۳۰:۰۰ (‎+۳:۳۰ گرینویچ)')
// });