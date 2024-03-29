'use server';
import prisma from '@/lib/prisma';
import { schema, schemaType } from '@/schemas/form';
import { currentUser } from '@clerk/nextjs';

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id
    },
    _sum: {
      visits: true,
      submissions: true
    }
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return { visits, submissionRate, submissions, bounceRate };
}

export async function CreateForm(data: schemaType) {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    throw new Error('Form data not valid');
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      ...data
    }
  });

  if (!form) throw new Error('Something went wrong');

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getFormById(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id
    }
  });
}

export async function getFormByUrl(url: string) {
  return await prisma.form.update({
    select: {
      content: true
    },
    data: {
      visits: {
        increment: 1
      }
    },
    where: {
      shareUrl: url
    }
  });
}

export async function saveFormContent(id: string, formContent: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id
    },
    data: {
      content: formContent
    }
  });
}

export async function PublishForm(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id
    },
    data: {
      published: true
    }
  });
}

export async function SubmitFormResponses(url: string, data: string) {
  return await prisma.form.update({
    where: {
      shareUrl: url,
      published: true
    },
    data: {
      submissions: {
        increment: 1
      },
      FormSubmissions: {
        create: {
          content: data
        }
      }
    }
  });
}

export async function GetFormSubmissions(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id
    },
    include: {
      FormSubmissions: true
    }
  });
}
