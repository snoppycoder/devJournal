import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async writeJournal(content: string, id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return {
        message: 'Try logging in',
      };
    }
    try {
      await this.prisma.entry.create({
        data: {
          user: { connect: { id: user.id } },
          content,
        },
      });
      return {
        success: true,
        message: 'successfully wrote your journal',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error,
      };
    }
  }
  async getMyJournals(id: number) {
    const lists = await this.prisma.user.findUnique({
      where: { id },
      select: {
        entries: true,
      },
    });
    return lists;
  }
}
