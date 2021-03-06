var fs = require('fs');
const path = require('path');


// Add student //
const addNew = (student) => {
    // b1 lấy nội dung file
    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) { // có lỗi => file không tồn tại hoặc có lỗi khi đọc 
            console.log('lỗi khi đọc file')
            throw err;
        }
        // khi lấy được dữ liệu thì cần JSON.parse để lấy ra mảng vì dữ liệu lấy ra là string 
        // ******** 1 số trương hợp xảy ra lỗi nếu data lấy ra không phải là json ******
        const convertData = JSON.parse(data);

        //b2 thêm mới student
        const newList = [
            ...convertData,
            student
        ];
        //b3 ghi đè dữ liệu cũ
        fs.writeFile('student.json', JSON.stringify(newList), function (err) {
            if (err) { // có lỗi 
                console.log(err);
                throw err;
            }
            console.log('THêm mới học sinh thành công');
        });
    })
}
const addNewPromise = async student => {
    try {
        // b1 check sự tồn tại file 
        const isExit = await fs.existsSync(path.resolve(__dirname, 'student.json'));
        if (!isExit) {
            const newList = [student];
            const dataToSave = JSON.stringify(newList)
            await fs.promises.writeFile('student.json', dataToSave);
            return 1;
        }

        // đã tồn tại 
        const data = await fs.promises.readFile(path.resolve(__dirname, 'student.json'), 'utf8');

        const dataConvert = JSON.parse(data);
        const newList = [...dataConvert, student];
        console.log('newList_dta', newList)

        await fs.promises.writeFile(path.resolve(__dirname, 'student.json'), JSON.stringify(newList));

        console.log('THêm mới học sinh thành công');

    } catch (err) {
        console.log('THêm mới học sinh thất bại');
        throw err;

    }
}

// addNewPromise({
    //     "id": 1,
    //     "name": "nam",
    //     "age": 23,
    //     "gender": "Female",
    //     "department": "History"
    // },


const getAllUser = async () => {
    const result = await fs.promises.readFile(path.resolve(__dirname, 'student.json'), 'utf8');
    const dataConvert = JSON.parse(result);
    return dataConvert;
}
const queryUser = async (params) => {
    const allUser = await getAllUser();
    console.log('params', params)
    const result = allUser.filter(user => {
        if (params.name) {
            return user.name.includes(params.name) || +params.age == +user.age;
        } else {
            return params.age == user.age;
        }
    });

    return result;
}

////Delete by ID/////
const deleteUserByID = async (userID) => {
    try {
        const allUser = await getAllUser();

        const newListUser = allUser.filter(user => {
            return user.id != userID
        })
        if (newListUser.length === allUser.length) {
            return {
                status: 400,
                msg: `Không tìm thấy user ${userID} `
            }
        } else {
            await fs.promises.writeFile(path.resolve(__dirname, 'student.json'), JSON.stringify(newListUser));
            return {
                status: 200,
                msg: `Xoá user ${userID} thành công `
            }
        }
        return 1;
    } catch (err) {
        throw err
    }

}


/////Update/////
const updateobj = (obj, update) => {
    let newobj = obj;

    for (let a in obj) {
        for (let b in update) {
            if (a == b) obj[a] = update[b];
        }
    }

    return newobj;
};

const updateall = async(update) => {
    try {
        let list = await readall();
        if (list == false) return false;
        else {
            let data = list;
            //All data so just direct update
            data = data.map((value) => {
                return updateobj(value, update);
            });

            data = JSON.stringify(data);

            let result = await fs.promises.writeFile("./student.json", data);

            console.log(data);

            return list;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};







module.exports = {
    updateall,
    getAllUser,
    queryUser,
    addUser: addNewPromise,
    deleteUserByID,
}