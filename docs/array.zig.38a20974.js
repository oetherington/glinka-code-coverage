var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   21","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   22","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   23","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   24","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   25","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   26","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   27","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   28","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   29","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"pub fn inferArrayType(","class":"lineCov","hits":"1","order":"6845","possible_hits":"1",},
{"lineNum":"   32","line":"    cmp: *Compiler,"},
{"lineNum":"   33","line":"    nd: node.Node,"},
{"lineNum":"   34","line":"    ctx: *const InferContext,"},
{"lineNum":"   35","line":"    arr: node.NodeList,"},
{"lineNum":"   36","line":") InferResult {"},
{"lineNum":"   37","line":"    if (arr.items.len == 0) {","class":"lineCov","hits":"2","order":"6846","possible_hits":"2",},
{"lineNum":"   38","line":"        nd.ty = cmp.typebook.getArray(cmp.typebook.getUnknown());","class":"lineCov","hits":"1","order":"6847","possible_hits":"1",},
{"lineNum":"   39","line":"    } else {"},
{"lineNum":"   40","line":"        const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"6856","possible_hits":"1",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"        var res = inferExprType(cmp, arr.items[0], &subCtx);","class":"linePartCov","hits":"1","order":"6857","possible_hits":"2",},
{"lineNum":"   43","line":"        if (res.getType() != .Success)","class":"lineCov","hits":"2","order":"6858","possible_hits":"2",},
{"lineNum":"   44","line":"            return res;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        var subtype = res.Success;","class":"linePartCov","hits":"2","order":"6859","possible_hits":"3",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"        for (arr.items[1..]) |item| {","class":"linePartCov","hits":"3","order":"6860","possible_hits":"4",},
{"lineNum":"   49","line":"            res = inferExprType(cmp, item, &subCtx);","class":"lineCov","hits":"1","order":"6861","possible_hits":"1",},
{"lineNum":"   50","line":"            if (res.getType() != .Success)","class":"lineCov","hits":"2","order":"6862","possible_hits":"2",},
{"lineNum":"   51","line":"                return res;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"            subtype = cmp.typebook.combine(subtype, res.Success);","class":"linePartCov","hits":"2","order":"6863","possible_hits":"3",},
{"lineNum":"   54","line":"        }"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"        nd.ty = cmp.typebook.getArray(subtype);","class":"lineCov","hits":"1","order":"6864","possible_hits":"1",},
{"lineNum":"   57","line":"    }"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"6848","possible_hits":"2",},
{"lineNum":"   60","line":"}"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"test \"can infer type of an empty array\" {","class":"lineCov","hits":"2","order":"6842","possible_hits":"2",},
{"lineNum":"   63","line":"    const items = node.NodeList{ .items = &[_]node.Node{} };"},
{"lineNum":"   64","line":"    try (InferTestCase{","class":"lineCov","hits":"1","order":"6849","possible_hits":"1",},
{"lineNum":"   65","line":"        .expectedTy = .Array,"},
{"lineNum":"   66","line":"    }).run(.Array, items);","class":"lineCov","hits":"1","order":"6843","possible_hits":"1",},
{"lineNum":"   67","line":"}"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"test \"can infer type of a homogeneous array\" {","class":"lineCov","hits":"3","order":"6850","possible_hits":"3",},
{"lineNum":"   70","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"   71","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6851","possible_hits":"1",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    const items = node.NodeList{ .items = &[_]node.Node{","class":"lineCov","hits":"1","order":"6854","possible_hits":"1",},
{"lineNum":"   74","line":"        node.makeNode(alloc, csr, .Int, \"1\"),","class":"lineCov","hits":"1","order":"6852","possible_hits":"1",},
{"lineNum":"   75","line":"        node.makeNode(alloc, csr, .Int, \"2\"),","class":"lineCov","hits":"1","order":"6853","possible_hits":"1",},
{"lineNum":"   76","line":"    } };"},
{"lineNum":"   77","line":"    defer alloc.destroy(items.items[0]);","class":"linePartCov","hits":"1","order":"6877","possible_hits":"2",},
{"lineNum":"   78","line":"    defer alloc.destroy(items.items[1]);","class":"linePartCov","hits":"1","order":"6876","possible_hits":"3",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6875","possible_hits":"2",},
{"lineNum":"   81","line":"        .check = (struct {"},
{"lineNum":"   82","line":"            fn check(","class":"lineCov","hits":"1","order":"6865","possible_hits":"1",},
{"lineNum":"   83","line":"                scope: *Scope,"},
{"lineNum":"   84","line":"                typebook: *TypeBook,"},
{"lineNum":"   85","line":"                res: InferResult,"},
{"lineNum":"   86","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6874","possible_hits":"1",},
{"lineNum":"   87","line":"                _ = scope;"},
{"lineNum":"   88","line":"                _ = typebook;"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"                try InferTestCase.expectSuccess(res);","class":"lineCov","hits":"1","order":"6866","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"                const arr = res.Success;","class":"linePartCov","hits":"2","order":"6870","possible_hits":"3",},
{"lineNum":"   93","line":"                try std.testing.expectEqual(Type.Type.Array, arr.getType());","class":"linePartCov","hits":"1","order":"6871","possible_hits":"2",},
{"lineNum":"   94","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6873","possible_hits":"2",},
{"lineNum":"   95","line":"                    Type.Type.Number,"},
{"lineNum":"   96","line":"                    arr.Array.subtype.getType(),","class":"linePartCov","hits":"2","order":"6872","possible_hits":"3",},
{"lineNum":"   97","line":"                );"},
{"lineNum":"   98","line":"            }"},
{"lineNum":"   99","line":"        }).check,"},
{"lineNum":"  100","line":"    }).run(.Array, items);","class":"lineCov","hits":"1","order":"6855","possible_hits":"1",},
{"lineNum":"  101","line":"}"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"test \"can infer type of an inhomogeneous array\" {","class":"lineCov","hits":"3","order":"6878","possible_hits":"3",},
{"lineNum":"  104","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  105","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6879","possible_hits":"1",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    const items = node.NodeList{ .items = &[_]node.Node{","class":"lineCov","hits":"1","order":"6882","possible_hits":"1",},
{"lineNum":"  108","line":"        node.makeNode(alloc, csr, .Int, \"1\"),","class":"lineCov","hits":"1","order":"6880","possible_hits":"1",},
{"lineNum":"  109","line":"        node.makeNode(alloc, csr, .String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"6881","possible_hits":"1",},
{"lineNum":"  110","line":"    } };"},
{"lineNum":"  111","line":"    defer alloc.destroy(items.items[0]);","class":"linePartCov","hits":"1","order":"6897","possible_hits":"2",},
{"lineNum":"  112","line":"    defer alloc.destroy(items.items[1]);","class":"linePartCov","hits":"1","order":"6896","possible_hits":"3",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6895","possible_hits":"2",},
{"lineNum":"  115","line":"        .check = (struct {"},
{"lineNum":"  116","line":"            fn check(","class":"lineCov","hits":"1","order":"6884","possible_hits":"1",},
{"lineNum":"  117","line":"                scope: *Scope,"},
{"lineNum":"  118","line":"                typebook: *TypeBook,"},
{"lineNum":"  119","line":"                res: InferResult,"},
{"lineNum":"  120","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"6894","possible_hits":"1",},
{"lineNum":"  121","line":"                _ = scope;"},
{"lineNum":"  122","line":"                _ = typebook;"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"                try InferTestCase.expectSuccess(res);","class":"lineCov","hits":"1","order":"6885","possible_hits":"1",},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"                const arr = res.Success;","class":"linePartCov","hits":"2","order":"6886","possible_hits":"3",},
{"lineNum":"  127","line":"                try std.testing.expectEqual(Type.Type.Array, arr.getType());","class":"linePartCov","hits":"1","order":"6887","possible_hits":"2",},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"                const sub = arr.Array.subtype;","class":"linePartCov","hits":"2","order":"6888","possible_hits":"3",},
{"lineNum":"  130","line":"                try std.testing.expectEqual(Type.Type.Union, sub.getType());","class":"linePartCov","hits":"1","order":"6889","possible_hits":"2",},
{"lineNum":"  131","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6891","possible_hits":"2",},
{"lineNum":"  132","line":"                    Type.Type.Number,"},
{"lineNum":"  133","line":"                    sub.Union.tys[0].getType(),","class":"lineCov","hits":"2","order":"6890","possible_hits":"2",},
{"lineNum":"  134","line":"                );"},
{"lineNum":"  135","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"6893","possible_hits":"2",},
{"lineNum":"  136","line":"                    Type.Type.String,"},
{"lineNum":"  137","line":"                    sub.Union.tys[1].getType(),","class":"lineCov","hits":"2","order":"6892","possible_hits":"2",},
{"lineNum":"  138","line":"                );"},
{"lineNum":"  139","line":"            }"},
{"lineNum":"  140","line":"        }).check,"},
{"lineNum":"  141","line":"    }).run(.Array, items);","class":"lineCov","hits":"1","order":"6883","possible_hits":"1",},
{"lineNum":"  142","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:39:00", "instrumented" : 54, "covered" : 52,};
var merged_data = [];
