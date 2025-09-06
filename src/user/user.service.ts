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

  async likeAJournal(id: number, journalId: number) {
    const userReacted = await this.prisma.user.findUnique({
      where: { id },
      select: {
        reactedEntries: true,
      },
    });
    if (!userReacted) {
      throw new Error('User not found');
    }
    const reactedEntries = userReacted.reactedEntries || [];
    if (reactedEntries.some((entry) => entry.id === journalId)) {
      return { success: false, message: 'You reacted to this post already' };
    }
    const journal = await this.prisma.entry.update({
      where: {
        id: journalId,
      },
      data: {
        like: { increment: 1 },
      },
    });
    await this.prisma.user.update({
      where: { id },
      data: {
        reactedEntries: {
          connect: { id: journalId },
        },
      },
    });
    return {
      success: true,
      message: 'You liked this post',
    };
  }
  async DisLikeAJournal(id: number, journalId: number) {
    const userReacted = await this.prisma.user.findUnique({
      where: { id },
      select: {
        reactedEntries: true,
      },
    });
    if (!userReacted) {
      throw new Error('User not found');
    }
    const reactedEntries = userReacted.reactedEntries || [];
    if (reactedEntries.some((entry) => entry.id === journalId)) {
      return { success: false, message: 'You reacted to this post already' };
    }
    const journal = await this.prisma.entry.update({
      where: {
        id: journalId,
      },
      data: {
        dislike: { increment: 1 },
      },
    });
    await this.prisma.user.update({
      where: { id },
      data: {
        reactedEntries: {
          connect: { id: journalId },
        },
      },
    });
    return {
      success: true,
      message: 'You disliked this post',
    };
  }
}
