"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesToPDF = void 0;
var fs = __importStar(require("fs"));
var image_size_1 = __importDefault(require("image-size"));
var pdfkit_1 = __importDefault(require("pdfkit"));
var ImagesToPDF = /** @class */ (function () {
    function ImagesToPDF() {
    }
    ImagesToPDF.prototype.convertFolderToPDF = function (folder, outputPath) {
        var doc = new pdfkit_1.default();
        fs.readdir(folder, function (_, files) {
            files.forEach(function (file, index) {
                var filePath = "".concat(folder, "/").concat(file);
                try {
                    var size = (0, image_size_1.default)(filePath);
                    if (index === 0) {
                        doc = new pdfkit_1.default({
                            size: [size.width, size.height]
                        });
                    }
                    else {
                        doc.addPage({ size: [size.width, size.height] });
                    }
                    doc.image(filePath, 0, 0, { width: size.width, height: size.height });
                }
                catch (_a) {
                    return;
                }
            });
            doc.pipe(fs.createWriteStream(outputPath));
            doc.end();
        });
    };
    return ImagesToPDF;
}());
exports.ImagesToPDF = ImagesToPDF;
