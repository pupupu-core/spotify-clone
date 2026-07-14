import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function ExactlyOneField(fields: string[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'exactlyOneField',
      target: object.constructor,
      propertyName,
      constraints: fields,
      options: validationOptions,
      validator: {
        validate(_: unknown, args: ValidationArguments): boolean {
          const dto = args.object as Record<string, unknown>;

          return fields.filter(field => dto[field] !== undefined).length === 1;
        },
      },
    });
  };
}
