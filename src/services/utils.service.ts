

export class UtilsService {

    static convertToArray(toConvert: any): Array<any> {
        if (Array.isArray(toConvert)) return toConvert;

        var array = toConvert.split(",");
        return array;
    }

    /**
     * deleteDuplicate is a function to delete duplicate values from an array
     * @param array
     */
    static deleteDuplicate(array: Array<any>): Array<any> {
        return array.filter((item, index) => array.indexOf(item) == index)
    }
} 