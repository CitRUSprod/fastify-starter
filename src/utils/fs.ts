import path from "path"
import fs from "fs-extra"
import { MultipartFile } from "@fastify/multipart"
import sharp from "sharp"
import { v4 as createUuid } from "uuid"
import { ImgSize, ImgExtension } from "$/enums"

export async function writeFile(dirPath: string, file: MultipartFile) {
    const ext = path.extname(file.filename).toLowerCase()
    const buffer = await file.toBuffer()

    const imgExtList: Array<string> = Object.values(ImgExtension)

    const fileName = `${createUuid()}${ext}`
    const absDirPath = path.join(__dirname, "../static", dirPath)

    await fs.ensureDir(absDirPath)

    if (imgExtList.includes(ext)) {
        const img = sharp(buffer)

        const { width, height } = await img.metadata()

        if (width && height) {
            if (width > ImgSize.MaxWidth) {
                img.resize({ width: ImgSize.MaxWidth })
            }

            if (height > ImgSize.MaxHeight) {
                img.resize({ height: ImgSize.MaxHeight })
            }
        }

        await img.toFile(`${absDirPath}/${fileName}`)
    } else {
        await fs.writeFile(`${absDirPath}/${fileName}`, buffer)
    }

    return fileName
}

export async function removeFile(dirPath: string, fileName: string) {
    const absDirPath = path.join(__dirname, "../static", dirPath)
    await fs.remove(`${absDirPath}/${fileName}`)
}
