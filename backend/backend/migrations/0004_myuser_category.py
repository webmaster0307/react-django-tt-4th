# Generated by Django 2.2 on 2020-03-18 12:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_myuser_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Category'),
        ),
    ]
