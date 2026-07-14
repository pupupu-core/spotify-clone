import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

export function AtLeastOneField({
  fields,
  validationOptions,
}: {
  fields: string[];
  validationOptions?: ValidationOptions;
}) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'atLeastOneField',
      target: object.constructor,
      propertyName,
      constraints: fields,
      options: validationOptions,
      validator: {
        validate(_: unknown, args: ValidationArguments): boolean {
          const dto = args.object as Record<string, unknown>;

          return fields.some(field => dto[field] !== undefined);
        },
      },
    });
  };
}
