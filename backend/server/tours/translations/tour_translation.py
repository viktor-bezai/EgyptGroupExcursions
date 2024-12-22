from modeltranslation.translator import TranslationOptions


class TourTranslation(TranslationOptions):
    fields = ('title', 'description')
