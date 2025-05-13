import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function UpdateFCWeb(id: number, data: any) {
    try {
      const result = await prisma.fcweb.update({
        where: {
          id: id
        },
        data: data
      })

      return result

    } catch (error) {
      console.log(error)
    }
}
