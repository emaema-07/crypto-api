// set all necessary configurations here

// Add version number
var versionNumberV1 = 'v1';

// set current version number
var currentVersionNumber = versionNumberV1;

// set media file path
var mediaPath = './media';
// export current version number
module.exports.currentVersionNumber = currentVersionNumber;
module.exports.mediaPath = mediaPath;

//database details
var db_staging = 'mongodb+srv://mongo:mongo@cluster0.qoqnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports.db_staging = db_staging;
