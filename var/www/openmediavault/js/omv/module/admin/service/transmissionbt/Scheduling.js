/**
 * Copyright (C) 2011-2012 Marcel Beck <marcel.beck@mbeck.org>
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")

Ext.define('OMV.module.admin.service.transmissionbt.Scheduling', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getSchedulingSettings',
    rpcSetMethod: 'setSchedulingSettings',

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('General'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'alt-speed-time-enabled',
                fieldLabel: _('Scheduling'),
                checked: false,
                boxLabel: _('When enabled, this will toggle the Turtle Mode.')
            }, {
                xtype: 'fieldset',
                title: _('Time'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'compositefield',
                    name: 'begin-time',
                    fieldLabel: _('Begin'),
                    width: 200,
                    items: [{
                        xtype: 'combo',
                        name: 'begin-hour',
                        queryMode: 'local',
                        store: Ext.Array.range(0, 23),
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        width: 50,
                        value: 9,
                        reset: function() {}
                    }, {
                        xtype: 'displayfield',
                        value: ':'
                    }, {
                        xtype: 'combo',
                        name: 'begin-minute',
                        queryMode: 'local',
                        store: Ext.Array.range(0, 59),
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        width: 50,
                        value: 0,
                        reset: function() {}
                    }]
                }, {
                    xtype: 'compositefield',
                    name: 'end-time',
                    fieldLabel: _('End'),
                    width: 200,
                    items: [{
                        xtype: 'combo',
                        name: 'end-hour',
                        queryMode: 'local',
                        store: Ext.Array.range(0, 23),
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        width: 50,
                        value: 17,
                        reset: function() {}
                    }, {
                        xtype: 'displayfield',
                        value: ':'
                    }, {
                        xtype: 'combo',
                        name: 'end-minute',
                        queryMode: 'local',
                        store: Ext.Array.range(0, 59),
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        width: 50,
                        value: 0,
                        reset: function() {}
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: _('Days'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'checkbox',
                    name: 'days-sunday',
                    fieldLabel: _('Sunday'),
                    checked: true
                }, {
                    xtype: 'checkbox',
                    name: 'days-monday',
                    fieldLabel: _('Monday'),
                    checked: true
                }, {
                    xtype: 'checkbox',
                    name: 'days-tuesday',
                    fieldLabel: _('Tuesday'),
                    checked: true
                }, {
                    xtype: 'checkbox',
                    name: 'days-wednesday',
                    fieldLabel: _('Wednesday'),
                    checked: true
                }, {
                    xtype: 'checkbox',
                    name: 'days-thursday',
                    fieldLabel: _('Thursday'),
                    checked: true
                }, {
                    xtype: 'checkbox',
                    name: 'days-friday',
                    fieldLabel: _('Friday'),
                    checked: true
                }, {
                    xtype: 'checkbox',
                    name: 'days-saturday',
                    fieldLabel: _('Saturday'),
                    checked: true
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: _('Idle'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'idle-seeding-limit-enabled',
                fieldLabel: _('Seeding limit'),
                checked: false,
                boxLabel: _('Stop seeding after being idle for N minutes.')
            }, {
                xtype: 'numberfield',
                name: 'idle-seeding-limit',
                fieldLabel: _('Idle minutes'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 30
            }]
        }, {
            xtype: 'fieldset',
            title: _('Ratio'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'ratio-limit-enabled',
                fieldLabel: _('Ratio'),
                checked: false,
                boxLabel: _('Transmission will only seed until ratio limit is reached.')
            }, {
                xtype: 'numberfield',
                name: 'ratio-limit',
                fieldLabel: _('Ratio limit'),
                allowDecimals: true,
                allowNegative: false,
                allowBlank: false,
                value: 2.0
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'scheduling',
    path: '/service/transmissionbt',
    text: _('Scheduling'),
    position: 80,
    className: 'OMV.module.admin.service.transmissionbt.Scheduling'
});
