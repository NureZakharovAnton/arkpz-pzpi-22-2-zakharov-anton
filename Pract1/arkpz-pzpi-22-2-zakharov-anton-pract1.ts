// Явна типізація
// поганий приклад
let userName1 = 'John';
let userAge1 = 25;

// гарний приклад  
let userName2: string = 'John';
let userAge2: number = 25;

// Інтерфейси
// поганий приклад
function processUserBad(user: any) {
    console.log(user.name);
}

// гарний приклад
interface IUser {
    name: string;
    age: number;
}

function processUserGood(user: IUser) {
    console.log(user.name);
}

// Enum для констант
// поганий приклад
const STATUS_PENDING = 'PENDING';
const STATUS_ACTIVE = 'ACTIVE';
const STATUS_DELETED = 'DELETED';

// гарний приклад
enum UserStatus {
    Pending = 'PENDING',
    Active = 'ACTIVE',
    Deleted = 'DELETED'
}

// Union types
// поганий приклад
function processValueBad(value: any) {
    return value;
}

// гарний приклад
function processValueGood(value: string | number) {
    return value;
}

// Type aliases
// поганий приклад
function processDataBad(callback: (data: string | number) => void) {
    // ...
}

// гарний приклад
type ProcessDataType = string | number;
type ProcessDataCallback = (data: ProcessDataType) => void;

function processDataGood(callback: ProcessDataCallback) {
    // ...
}

// Readonly властивості
// поганий приклад
interface ConfigBad {
    apiUrl: string;
    timeout: number;
}

// гарний приклад
interface ConfigGood {
    readonly apiUrl: string;
    readonly timeout: number;
}

// Generics
// поганий приклад
function getFirstBad(arr: any[]): any {
    return arr[0];
}

// гарний приклад
function getFirstGood<T>(arr: T[]): T {
    return arr[0];
}

// Async/await
// поганий приклад
function fetchDataBad(callback: (error: Error | null, data?: any) => void) {
    // ...
}

// гарний приклад
interface ApiData {
    id: number;
    data: string;
}

async function fetchDataGood(): Promise<ApiData> {
    const response = await fetch('api/data');
    return response.json();
}

// Null coalescing та optional chaining
interface UserProfile {
    name?: string;
    profile?: {
        name: string;
    };
}

// поганий приклад
function getUserNameBad(user: UserProfile) {
    return user && user.profile ? user.profile.name : 'Anonymous';
}

// гарний приклад
function getUserNameGood(user: UserProfile) {
    return user?.profile?.name ?? 'Anonymous';
}

// Type guards
// поганий приклад
function processValueWithTypeCastBad(value: string | number) {
    if ((value as string).toLowerCase) {
        return (value as string).toLowerCase();
    }
    return value;
}

// гарний приклад
function processValueWithTypeGuardGood(value: string | number) {
    if (typeof value === 'string') {
        return value.toLowerCase();
    }
    return value;
}

// Декоратори
// поганий приклад
class UserServiceBad {
    getUser() {
        console.log('Starting request...');
        // logic
        console.log('Request completed');
    }
}

// гарний приклад
function logDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    // logging logic
}

class UserServiceGood {
    @logDecorator
    getUser() {
        // logic
    }
}

// Літеральні типи
// поганий приклад
function setAlignmentBad(alignment: string) {
    // ...
}

// гарний приклад
type TextAlignment = 'left' | 'right' | 'center';
function setAlignmentGood(alignment: TextAlignment) {
    // ...
}

// Mapped types
// поганий приклад
interface ReadOnlyUserBad {
    readonly name: string;
    readonly age: number;
}
interface EditableUserBad {
    name: string;
    age: number;
}

// гарний приклад
interface UserBase {
    name: string;
    age: number;
}
type ReadOnlyUserType<T> = {
    readonly [P in keyof T]: T[P];
};
type ReadOnlyUserGood = ReadOnlyUserType<UserBase>;

// Utility types
// поганий приклад
type PartialUserBad = {
    name?: string;
    age?: number;
    email?: string;
};

// гарний приклад
interface UserFull {
    name: string;
    age: number;
    email: string;
}
type PartialUserGood = Partial<UserFull>;