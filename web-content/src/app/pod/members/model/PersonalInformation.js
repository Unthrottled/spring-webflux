"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersonalInformation = /** @class */ (function () {
    function PersonalInformation() {
        this.interests = [];
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
    }
    PersonalInformation.prototype.addInterest = function (interest) {
        this.interests.push(interest);
    };
    PersonalInformation.prototype.removeInterest = function (interest) {
        this.interests = this.interests.filter(function (it) { return it.id !== interest.id; });
    };
    return PersonalInformation;
}());
exports.PersonalInformation = PersonalInformation;
//# sourceMappingURL=PersonalInformation.js.map