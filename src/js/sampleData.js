// Sample data for Family Tree Visualization
export const sampleData = [
    {
        id: 1,
        name: 'Rajan Kumar',
        gender: 'Male',
        spouse_name: 'Priya Kumar',
        father_name: 'Mohan Kumar',
        mother_name: 'Lakshmi Kumar',
        birth_date: '1945-05-15',
        death_date: '2015-10-23',
        native_place: 'Chennai',
        father_id: 5,
        mother_id: 6,
        spouse_id: 2
    },
    {
        id: 2,
        name: 'Priya Kumar',
        gender: 'Female',
        spouse_name: 'Rajan Kumar',
        father_name: 'Venkat Rao',
        mother_name: 'Saraswati Rao',
        birth_date: '1948-09-30',
        death_date: null,
        native_place: 'Madurai',
        father_id: 7,
        mother_id: 8,
        spouse_id: 1
    },
    {
        id: 3,
        name: 'Arjun Kumar',
        gender: 'Male',
        spouse_name: 'Deepa Kumar',
        father_name: 'Rajan Kumar',
        mother_name: 'Priya Kumar',
        birth_date: '1970-03-22',
        death_date: null,
        native_place: 'Chennai',
        father_id: 1,
        mother_id: 2,
        spouse_id: 4
    },
    {
        id: 4,
        name: 'Deepa Kumar',
        gender: 'Female',
        spouse_name: 'Arjun Kumar',
        father_name: 'Ramesh Sharma',
        mother_name: 'Anita Sharma',
        birth_date: '1972-11-08',
        death_date: null,
        native_place: 'Bangalore',
        father_id: 9,
        mother_id: 10,
        spouse_id: 3
    },
    {
        id: 5,
        name: 'Mohan Kumar',
        gender: 'Male',
        spouse_name: 'Lakshmi Kumar',
        father_name: null,
        mother_name: null,
        birth_date: '1920-01-05',
        death_date: '1990-12-15',
        native_place: 'Chennai',
        father_id: null,
        mother_id: null,
        spouse_id: 6
    },
    {
        id: 6,
        name: 'Lakshmi Kumar',
        gender: 'Female',
        spouse_name: 'Mohan Kumar',
        father_name: null,
        mother_name: null,
        birth_date: '1925-04-20',
        death_date: '1995-08-10',
        native_place: 'Chennai',
        father_id: null,
        mother_id: null,
        spouse_id: 5
    },
    {
        id: 7,
        name: 'Venkat Rao',
        gender: 'Male',
        spouse_name: 'Saraswati Rao',
        father_name: null,
        mother_name: null,
        birth_date: '1922-07-12',
        death_date: '1992-03-18',
        native_place: 'Madurai',
        father_id: null,
        mother_id: null,
        spouse_id: 8
    },
    {
        id: 8,
        name: 'Saraswati Rao',
        gender: 'Female',
        spouse_name: 'Venkat Rao',
        father_name: null,
        mother_name: null,
        birth_date: '1926-11-30',
        death_date: '1998-05-22',
        native_place: 'Madurai',
        father_id: null,
        mother_id: null,
        spouse_id: 7
    },
    {
        id: 9,
        name: 'Ramesh Sharma',
        gender: 'Male',
        spouse_name: 'Anita Sharma',
        father_name: null,
        mother_name: null,
        birth_date: '1945-08-16',
        death_date: '2010-02-28',
        native_place: 'Bangalore',
        father_id: null,
        mother_id: null,
        spouse_id: 10
    },
    {
        id: 10,
        name: 'Anita Sharma',
        gender: 'Female',
        spouse_name: 'Ramesh Sharma',
        father_name: null,
        mother_name: null,
        birth_date: '1947-12-03',
        death_date: null,
        native_place: 'Bangalore',
        father_id: null,
        mother_id: null,
        spouse_id: 9
    },
    {
        id: 11,
        name: 'Vikram Kumar',
        gender: 'Male',
        spouse_name: 'Kavita Kumar',
        father_name: 'Arjun Kumar',
        mother_name: 'Deepa Kumar',
        birth_date: '1995-06-20',
        death_date: null,
        native_place: 'Chennai',
        father_id: 3,
        mother_id: 4,
        spouse_id: 12
    },
    {
        id: 12,
        name: 'Kavita Kumar',
        gender: 'Female',
        spouse_name: 'Vikram Kumar',
        father_name: 'Dinesh Patel',
        mother_name: 'Sunita Patel',
        birth_date: '1997-09-15',
        death_date: null,
        native_place: 'Mumbai',
        father_id: null,
        mother_id: null,
        spouse_id: 11
    },
    {
        id: 13,
        name: 'Meera Kumar',
        gender: 'Female',
        spouse_name: null,
        father_name: 'Arjun Kumar',
        mother_name: 'Deepa Kumar',
        birth_date: '1998-04-12',
        death_date: null,
        native_place: 'Chennai',
        father_id: 3,
        mother_id: 4,
        spouse_id: null
    },
    {
        id: 14,
        name: 'ராஜன் குமார்',
        gender: 'ஆண்',
        spouse_name: 'பிரியா குமார்',
        father_name: 'மோகன் குமார்',
        mother_name: 'லக்ஷ்மி குமார்',
        birth_date: '1945-05-15',
        death_date: '2015-10-23',
        native_place: 'சென்னை',
        father_id: 18,
        mother_id: 19,
        spouse_id: 15
    },
    {
        id: 15,
        name: 'பிரியா குமார்',
        gender: 'பெண்',
        spouse_name: 'ராஜன் குமார்',
        father_name: 'வெங்கட் ராவ்',
        mother_name: 'சரஸ்வதி ராவ்',
        birth_date: '1948-09-30',
        death_date: null,
        native_place: 'மதுரை',
        father_id: 20,
        mother_id: 21,
        spouse_id: 14
    },
    {
        id: 16,
        name: 'அர்ஜுன் குமார்',
        gender: 'ஆண்',
        spouse_name: 'தீபா குமார்',
        father_name: 'ராஜன் குமார்',
        mother_name: 'பிரியா குமார்',
        birth_date: '1970-03-22',
        death_date: null,
        native_place: 'சென்னை',
        father_id: 14,
        mother_id: 15,
        spouse_id: 17
    },
    {
        id: 17,
        name: 'தீபா குமார்',
        gender: 'பெண்',
        spouse_name: 'அர்ஜுன் குமார்',
        father_name: 'ரமேஷ் சர்மா',
        mother_name: 'அனிதா சர்மா',
        birth_date: '1972-11-08',
        death_date: null,
        native_place: 'பெங்களூர்',
        father_id: null,
        mother_id: null,
        spouse_id: 16
    },
    {
        id: 18,
        name: 'மோகன் குமார்',
        gender: 'ஆண்',
        spouse_name: 'லக்ஷ்மி குமார்',
        father_name: null,
        mother_name: null,
        birth_date: '1920-01-05',
        death_date: '1990-12-15',
        native_place: 'சென்னை',
        father_id: null,
        mother_id: null,
        spouse_id: 19
    },
    {
        id: 19,
        name: 'லக்ஷ்மி குமார்',
        gender: 'பெண்',
        spouse_name: 'மோகன் குமார்',
        father_name: null,
        mother_name: null,
        birth_date: '1925-04-20',
        death_date: '1995-08-10',
        native_place: 'சென்னை',
        father_id: null,
        mother_id: null,
        spouse_id: 18
    },
    {
        id: 20,
        name: 'வெங்கட் ராவ்',
        gender: 'ஆண்',
        spouse_name: 'சரஸ்வதி ராவ்',
        father_name: null,
        mother_name: null,
        birth_date: '1922-07-12',
        death_date: '1992-03-18',
        native_place: 'மதுரை',
        father_id: null,
        mother_id: null,
        spouse_id: 21
    },
    {
        id: 21,
        name: 'சரஸ்வதி ராவ்',
        gender: 'பெண்',
        spouse_name: 'வெங்கட் ராவ்',
        father_name: null,
        mother_name: null,
        birth_date: '1926-11-30',
        death_date: '1998-05-22',
        native_place: 'மதுரை',
        father_id: null,
        mother_id: null,
        spouse_id: 20
    }
];

// Sample CSV content (for testing)
export const sampleCSV = `id,name,gender,spouse_name,father_name,mother_name,birth_date,death_date,native_place,father_id,mother_id,spouse_id
1,Rajan Kumar,Male,Priya Kumar,Mohan Kumar,Lakshmi Kumar,1945-05-15,2015-10-23,Chennai,5,6,2
2,Priya Kumar,Female,Rajan Kumar,Venkat Rao,Saraswati Rao,1948-09-30,,Madurai,7,8,1
3,Arjun Kumar,Male,Deepa Kumar,Rajan Kumar,Priya Kumar,1970-03-22,,Chennai,1,2,4
4,Deepa Kumar,Female,Arjun Kumar,Ramesh Sharma,Anita Sharma,1972-11-08,,Bangalore,9,10,3
5,Mohan Kumar,Male,Lakshmi Kumar,,,1920-01-05,1990-12-15,Chennai,,,6
6,Lakshmi Kumar,Female,Mohan Kumar,,,1925-04-20,1995-08-10,Chennai,,,5
7,Venkat Rao,Male,Saraswati Rao,,,1922-07-12,1992-03-18,Madurai,,,8
8,Saraswati Rao,Female,Venkat Rao,,,1926-11-30,1998-05-22,Madurai,,,7
9,Ramesh Sharma,Male,Anita Sharma,,,1945-08-16,2010-02-28,Bangalore,,,10
10,Anita Sharma,Female,Ramesh Sharma,,,1947-12-03,,Bangalore,,,9
11,Vikram Kumar,Male,Kavita Kumar,Arjun Kumar,Deepa Kumar,1995-06-20,,Chennai,3,4,12
12,Kavita Kumar,Female,Vikram Kumar,Dinesh Patel,Sunita Patel,1997-09-15,,Mumbai,,,11
13,Meera Kumar,Female,,Arjun Kumar,Deepa Kumar,1998-04-12,,Chennai,3,4,
14,ராஜன் குமார்,ஆண்,பிரியா குமார்,மோகன் குமார்,லக்ஷ்மி குமார்,1945-05-15,2015-10-23,சென்னை,18,19,15
15,பிரியா குமார்,பெண்,ராஜன் குமார்,வெங்கட் ராவ்,சரஸ்வதி ராவ்,1948-09-30,,மதுரை,20,21,14
16,அர்ஜுன் குமார்,ஆண்,தீபா குமார்,ராஜன் குமார்,பிரியா குமார்,1970-03-22,,சென்னை,14,15,17
17,தீபா குமார்,பெண்,அர்ஜுன் குமார்,ரமேஷ் சர்மா,அனிதா சர்மா,1972-11-08,,பெங்களூர்,,,16
18,மோகன் குமார்,ஆண்,லக்ஷ்மி குமார்,,,1920-01-05,1990-12-15,சென்னை,,,19
19,லக்ஷ்மி குமார்,பெண்,மோகன் குமார்,,,1925-04-20,1995-08-10,சென்னை,,,18
20,வெங்கட் ராவ்,ஆண்,சரஸ்வதி ராவ்,,,1922-07-12,1992-03-18,மதுரை,,,21
21,சரஸ்வதி ராவ்,பெண்,வெங்கட் ராவ்,,,1926-11-30,1998-05-22,மதுரை,,,20`;

export default {
    sampleData,
    sampleCSV
}; 