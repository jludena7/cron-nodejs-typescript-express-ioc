export default class DateHelper {
  static daysAgo(days: number): Date {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    return daysAgo;
  }
}
