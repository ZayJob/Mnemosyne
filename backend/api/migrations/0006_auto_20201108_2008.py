# Generated by Django 2.2 on 2020-11-08 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20201106_2209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prompt',
            name='done_date_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Дата выполнения'),
        ),
    ]
